import React, { useState, useEffect } from 'react';
import { getMyBookings, cancelBooking } from '../api/bookings';
import { useUserSaved } from '../context/UserSavedContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Calendar, MapPin, DollarSign, XCircle, CheckCircle2, Clock } from 'lucide-react';

const MyTripsPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { bookings: contextBookings, refreshBookings } = useUserSaved();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  const fetchTrips = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getMyBookings();
      if (res && Array.isArray(res.data)) {
        setTrips(res.data);
      } else if (Array.isArray(res)) {
        setTrips(res);
      } else if (contextBookings && contextBookings.length > 0) {
        setTrips(contextBookings);
      } else {
        setTrips([]);
      }
    } catch (err) {
      console.warn('Backend unavailable, using local trips:', err);
      if (contextBookings && contextBookings.length > 0) {
        setTrips(contextBookings);
      } else {
        setError('Could not load live bookings from server.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [user]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    const cleanId = parseInt(String(bookingId ?? '').replace(/#/g, '').trim(), 10);
    setCancellingId(cleanId);
    try {
      await cancelBooking(cleanId);
      setTrips((prev) =>
        prev.map((t) => (Number(t.id) === cleanId ? { ...t, status: 'CANCELLED' } : t))
      );
      if (refreshBookings) refreshBookings();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to cancel booking. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const s = String(status || '').toUpperCase();
    if (s === 'CONFIRMED') {
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Confirmed
        </span>
      );
    }
    if (s === 'CANCELLED') {
      return (
        <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-full font-bold">
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          Cancelled
        </span>
      );
    }
    if (s === 'REJECTED') {
      return (
        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full font-bold">
          <XCircle className="w-3.5 h-3.5 text-red-600" />
          REJECTED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold">
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        {status || 'Pending'}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-[70vh]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Trips & Reservations</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your upcoming and past Airbnb stays</p>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="text-sm font-semibold text-gray-700 hover:text-black transition hover:underline cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm font-medium">Loading your reservations...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center max-w-lg mx-auto">
          <div className="text-5xl mb-4">🧳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No trips booked... yet!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Time to dust off your bags and start planning your next adventure.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#FF385C] text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-[#E00B41] transition shadow-md cursor-pointer"
          >
            Start Exploring
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {trips.map((trip) => {
            const checkInDate = trip.checkIn ? new Date(trip.checkIn).toLocaleDateString() : 'N/A';
            const checkOutDate = trip.checkOut ? new Date(trip.checkOut).toLocaleDateString() : 'N/A';
            const statusUpper = String(trip.status || '').toUpperCase();
            const isActionable = statusUpper === 'CONFIRMED' || statusUpper === 'PENDING' || !statusUpper;
            const isCancelled = statusUpper === 'CANCELLED';
            const isRejected = statusUpper === 'REJECTED';

            return (
              <div
                key={trip.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-gray-500">
                      Reservation #{trip.id}
                    </span>
                    {getStatusBadge(trip.status)}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {trip.propertyTitle || `Property #${trip.propertyId || 1}`}
                  </h3>

                  {(trip.propertyCity || trip.propertyCountry) && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{[trip.propertyCity, trip.propertyCountry].filter(Boolean).join(', ')}</span>
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{checkInDate} — {checkOutDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {trip.totalPrice ? `${Number(trip.totalPrice).toLocaleString()} EGP` : 'Paid'}
                      </span>
                      {trip.guestsCount && (
                        <span className="text-gray-400 text-xs">
                          · {trip.guestsCount} {trip.guestsCount === 1 ? 'guest' : 'guests'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">
                    Guest: {trip.guestName || 'You'}
                  </span>
                  {isActionable ? (
                    <button
                      onClick={() => handleCancel(trip.id)}
                      disabled={cancellingId === trip.id}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
                      title="Cancel this reservation"
                    >
                      <XCircle className="w-3.5 h-3.5 text-white" />
                      {cancellingId === trip.id ? 'Cancelling...' : 'Cancel Reservation'}
                    </button>
                  ) : isCancelled ? (
                    <span className="text-xs font-semibold text-gray-400 italic">
                      Reservation Cancelled
                    </span>
                  ) : isRejected ? (
                    <span className="text-xs font-semibold text-red-500 italic">
                      Reservation Rejected
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400 italic">
                      {trip.status}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;