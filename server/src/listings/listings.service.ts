import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { ListingPhoto } from '../listing-photos/entities/listing-photo.entity';
import { ListingPhotosService } from '../listing-photos/listing-photos.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PaginationQueryDto, SearchListingDto } from './dto/listing-query.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(ListingPhoto)
    private readonly photoRepository: Repository<ListingPhoto>,
    private readonly listingPhotosService: ListingPhotosService,
  ) {}

  // 1. GET /api/properties -> Paginated property list
  async findAll(paginationDto: PaginationQueryDto) {
    const page = Number(paginationDto.page) || 1;
<<<<<<< HEAD
    const limit = Number(paginationDto.limit) && Number(paginationDto.limit) !== 10
      ? Number(paginationDto.limit)
      : 200;
=======
    const limit = Number(paginationDto.limit) || 50;
>>>>>>> 04bd5d5 (Merge branch 'main' into feature/homepage-grid)
    const skip = (page - 1) * limit;

    const [data, total] = await this.listingRepository.findAndCount({
      relations: { photos: true },
      order: { id: 'ASC' },
      take: limit,
      skip: skip,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // 2. GET /api/properties/search -> Advanced search & filters
  async search(searchDto: SearchListingDto) {
    const {
      location,
      city,
      country,
      minPrice,
      maxPrice,
      checkIn,
      checkOut,
      categoryId,
      guests,
      bedrooms,
      page = 1,
      limit = 10,
    } = searchDto;

    const query = this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.photos', 'photo');

    if (location) {
      query.andWhere(
        '(listing.address ILIKE :loc OR listing.city ILIKE :loc OR listing.country ILIKE :loc)',
        { loc: `%${location}%` },
      );
    }

    if (city) {
      query.andWhere('listing.city ILIKE :city', { city: `%${city}%` });
    }

    if (country) {
      query.andWhere('listing.country ILIKE :country', { country: `%${country}%` });
    }

    if (minPrice !== undefined) {
      query.andWhere('listing.pricePerNight >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      query.andWhere('listing.pricePerNight <= :maxPrice', { maxPrice });
    }

    if (categoryId) {
      query.andWhere('listing.categoryId = :categoryId', { categoryId });
    }

    if (guests) {
      query.andWhere('listing.maxGuests >= :guests', { guests });
    }

    if (bedrooms) {
      query.andWhere('listing.bedrooms >= :bedrooms', { bedrooms });
    }

    // Exclude listings booked during requested dates if bookings table exists
    if (checkIn && checkOut) {
      query.andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('b.listing_id')
          .from('bookings', 'b')
          .where('b.status NOT IN (:...cancelledStatuses)', {
            cancelledStatuses: ['CANCELLED', 'REJECTED'],
          })
          .andWhere('b.check_in < :checkOut AND b.check_out > :checkIn')
          .getQuery();
        return `listing.id NOT IN ${subQuery}`;
      }, { checkIn, checkOut });
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    query.take(limitNum).skip(skip).orderBy('listing.createdAt', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  // 3. GET /api/properties/top-rated -> Get top-rated properties
  async findTopRated(limit = 6) {
    return this.listingRepository.find({
      relations: { photos: true },
      order: {
        createdAt: 'DESC',
      },
      take: Number(limit) || 6,
    });
  }

  // 4. GET /api/properties/my-listings -> Get current host listings
  async findMyListings(hostId: string) {
    return this.listingRepository.find({
      where: { hostId: hostId as any },
      relations: { photos: true },
      order: { createdAt: 'DESC' },
    });
  }

  // 5. GET /api/properties/categories/:categoryId -> Properties by category ID
  async findByCategory(categoryId: string, paginationDto: PaginationQueryDto) {
    const page = Number(paginationDto.page) || 1;
    const limit = Number(paginationDto.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.listingRepository.findAndCount({
      where: { categoryId: categoryId as any },
      relations: { photos: true },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // 6. GET /api/properties/:id -> Get single property details
  async findOne(id: string | number) {
    const numericId = typeof id === 'number' ? id : parseInt(String(id).match(/\d+/)?.[0] || String(id), 10);
    if (isNaN(numericId)) {
      throw new NotFoundException(`Listing with ID "${id}" not found.`);
    }

    const listing = await this.listingRepository.findOne({
<<<<<<< HEAD
      where: { id: numericId as any },
=======
      where: { id: numericId },
>>>>>>> 04bd5d5 (Merge branch 'main' into feature/homepage-grid)
      relations: { photos: true },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID "${id}" not found.`);
    }

    return listing;
  }

  // 7. POST /api/properties -> Create new property
  async create(createListingDto: CreateListingDto, hostId: string) {
    const { photos = [], images = [], ...listingData } = createListingDto;
    const photoUrls = photos.length > 0 ? photos : images;

    const listing = this.listingRepository.create({
      ...listingData,
      categoryId: Number(listingData.categoryId) || 1,
      hostId: Number(hostId) || 1,
    } as any);

    const savedListing = await this.listingRepository.save(listing as any);

    if (photoUrls.length > 0) {
      await this.listingPhotosService.createMany(
        photoUrls.map((url: string, idx: number) => ({
          url,
          listingId: (savedListing as any).id,
          isCover: idx === 0,
        })),
      );
    }

    return this.findOne(String((savedListing as any).id));
  }

  // 8. PUT /api/properties/:id -> Update property details
  async update(id: string, updateListingDto: UpdateListingDto, hostId: string) {
    const listing = await this.findOne(id);

    if (String(listing.hostId) !== String(hostId)) {
      throw new ForbiddenException('You are not authorized to update this listing.');
    }

    const { photos, images, ...listingData } = updateListingDto;
    const photoUrls = photos || images;

    Object.assign(listing, listingData);
    await this.listingRepository.save(listing);

    if (photoUrls && photoUrls.length > 0) {
      await this.listingPhotosService.deleteByListingId(id);
      await this.listingPhotosService.createMany(
        photoUrls.map((url: string, idx: number) => ({
          url,
          listingId: id,
          isCover: idx === 0,
          order: idx,
        })),
      );
    }

    return this.findOne(id);
  }

  // 9. DELETE /api/properties/:id -> Delete property
  async remove(id: string, hostId: string) {
    const listing = await this.findOne(id);

    if (String(listing.hostId) !== String(hostId)) {
      throw new ForbiddenException('You are not authorized to delete this listing.');
    }

    await this.listingRepository.remove(listing);
    return { success: true, message: `Listing with ID "${id}" deleted successfully.` };
  }

  // 10. PATCH /api/properties/:id/status -> Toggle property status (active/inactive)
  async toggleStatus(id: string, isActive: boolean | undefined, hostId: string) {
    const listing = await this.findOne(id);

    if (String(listing.hostId) !== String(hostId)) {
      throw new ForbiddenException('You are not authorized to change status for this listing.');
    }

    return {
      id: listing.id,
      isActive: isActive !== undefined ? isActive : true,
      message: `Listing status updated.`,
    };
  }

  // 11. POST /api/properties/:id/images -> Upload property images
  async uploadImages(id: string, imageUrls: string[], hostId: string) {
    const listing = await this.findOne(id);

    if (String(listing.hostId) !== String(hostId)) {
      throw new ForbiddenException('You are not authorized to upload images for this listing.');
    }

    if (!imageUrls || imageUrls.length === 0) {
      throw new BadRequestException('No image URLs provided.');
    }

    const hasCover = listing.photos?.some((photo: ListingPhoto) => photo.isCover) ?? false;
    const newPhotos = imageUrls.map((url: string, idx: number) => ({
      url,
      listingId: id,
      isCover: !hasCover && idx === 0,
      order: (listing.photos?.length || 0) + idx,
    }));

    await this.listingPhotosService.createMany(newPhotos);
    return this.findOne(id);
  }

  // 12. DELETE /api/properties/:id/images/:imageId -> Delete specific property image
  async deleteImage(id: string, imageId: string, hostId: string) {
    const listing = await this.findOne(id);

    if (String(listing.hostId) !== String(hostId)) {
      throw new ForbiddenException('You are not authorized to delete photos from this listing.');
    }

    await this.listingPhotosService.remove(imageId, id);
    return { success: true, message: `Photo with ID "${imageId}" removed successfully.` };
  }
}
