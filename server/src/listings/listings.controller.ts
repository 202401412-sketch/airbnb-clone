import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  Query,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import {
  PaginationQueryDto,
  SearchListingDto,
  UpdateStatusDto,
} from './dto/listing-query.dto';

@Controller(['api/properties', 'api/listings', 'listings'])
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  // =============================================================
  // 1. STATIC ROUTES (MUST BE DECLARED BEFORE PARAMETRIC /:id ROUTES)
  // =============================================================

  // 1. GET /api/properties -> Paginated property list
  @Get()
  async findAll(@Query() paginationDto: PaginationQueryDto) {
    return this.listingsService.findAll(paginationDto);
  }

  // 2. GET /api/properties/search -> Advanced search & filters (price, dates, location)
  @Get('search')
  async search(@Query() searchDto: SearchListingDto) {
    return this.listingsService.search(searchDto);
  }

  // 3. GET /api/properties/top-rated -> Get top-rated properties
  @Get('top-rated')
  async getTopRated(@Query('limit') limit?: number) {
    return this.listingsService.findTopRated(limit);
  }

  // 4. GET /api/properties/my-listings -> Get current host listings
  @Get('my-listings')
  async getMyListings(@Req() req: any) {
    const hostId = req.user?.id || 'mock-host-id';
    return this.listingsService.findMyListings(hostId);
  }

  // 5. GET /api/properties/categories/:categoryId -> Properties by category ID
  @Get('categories/:categoryId')
  async getByCategory(
    @Param('categoryId') categoryId: string,
    @Query() paginationDto: PaginationQueryDto,
  ) {
    return this.listingsService.findByCategory(categoryId, paginationDto);
  }

  // GET /api/properties/business-ready -> Get business ready corporate properties
  @Get('business-ready')
  async getBusinessReadyProperties() {
    return {
      success: true,
      properties: [
        {
          id: 'prop-1',
          name: 'Executive Business Loft',
          features: ['Fast Wifi', 'Workstation', 'Self check-in', 'Official Invoices'],
        },
      ],
    };
  }

  // =============================================================
  // 2. PARAMETRIC ROUTES (/:id)
  // =============================================================

  // 6. GET /api/properties/:id -> Get single property details
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  // 7. POST /api/properties -> Create new property
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createListingDto: CreateListingDto, @Req() req: any) {
    const hostId = req.user?.id || 'mock-host-id';
    return this.listingsService.create(createListingDto, hostId);
  }

  // 8. PUT /api/properties/:id -> Update property details
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
    @Req() req: any,
  ) {
    const hostId = req.user?.id || 'mock-host-id';
    return this.listingsService.update(id, updateListingDto, hostId);
  }

  // 9. DELETE /api/properties/:id -> Delete property
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const hostId = req.user?.id || 'mock-host-id';
    return this.listingsService.remove(id, hostId);
  }

  // 10. PATCH /api/properties/:id/status -> Toggle property status (active/inactive)
  @Patch(':id/status')
  async toggleStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @Req() req: any,
  ) {
    const hostId = req.user?.id || 'mock-host-id';
    return this.listingsService.toggleStatus(id, updateStatusDto.isActive, hostId);
  }

  // 11. POST /api/properties/:id/images -> Upload property images
  @Post([':id/images', ':id/photos'])
  @HttpCode(HttpStatus.CREATED)
  async uploadImages(
    @Param('id') id: string,
    @Body() body: { images?: string[]; photos?: string[] },
    @Req() req: any,
  ) {
    const hostId = req.user?.id || 'mock-host-id';
    const imageUrls = body.images || body.photos || [];
    return this.listingsService.uploadImages(id, imageUrls, hostId);
  }

  // 12. DELETE /api/properties/:id/images/:imageId -> Delete specific property image
  @Delete([':id/images/:imageId', ':id/photos/:imageId'])
  async deleteImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @Req() req: any,
  ) {
    const hostId = req.user?.id || 'mock-host-id';
    return this.listingsService.deleteImage(id, imageId, hostId);
  }
}
