import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingPhoto } from './entities/listing-photo.entity.js';
import { CreateListingPhotoDto } from './dto/create-listing-photo.dto.js';

@Injectable()
export class ListingPhotosService {
  constructor(
    @InjectRepository(ListingPhoto)
    private readonly photoRepository: Repository<ListingPhoto>,
  ) {}

  async create(createPhotoDto: CreateListingPhotoDto): Promise<ListingPhoto> {
    const photo = this.photoRepository.create(createPhotoDto);
    return this.photoRepository.save(photo);
  }

  async createMany(
    photos: { url: string; listingId: string; isCover?: boolean; order?: number }[],
  ): Promise<ListingPhoto[]> {
    const photoEntities = photos.map((p, idx) =>
      this.photoRepository.create({
        url: p.url,
        listingId: p.listingId,
        isCover: p.isCover ?? idx === 0,
        order: p.order ?? idx,
      }),
    );
    return this.photoRepository.save(photoEntities);
  }

  async findByListingId(listingId: string): Promise<ListingPhoto[]> {
    return this.photoRepository.find({
      where: { listingId },
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<ListingPhoto> {
    const photo = await this.photoRepository.findOne({ where: { id } });
    if (!photo) {
      throw new NotFoundException(`Listing photo with ID "${id}" not found.`);
    }
    return photo;
  }

  async remove(id: string, listingId?: string): Promise<{ success: boolean; message: string }> {
    const where: any = { id };
    if (listingId) {
      where.listingId = listingId;
    }
    const photo = await this.photoRepository.findOne({ where });
    if (!photo) {
      throw new NotFoundException(`Listing photo with ID "${id}" not found.`);
    }
    await this.photoRepository.remove(photo);
    return { success: true, message: `Listing photo with ID "${id}" removed successfully.` };
  }

  async deleteByListingId(listingId: string): Promise<void> {
    await this.photoRepository.delete({ listingId });
  }
}
