import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { FileUploadDto } from 'src/api/file/file.dto';
import { FileService } from 'src/api/file/file.service';

@Controller('file')
export class FileController {
  constructor(fileService: FileService) {}

  @Post('xlsx')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadXLSXFile(
    @Body() body: FileUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
