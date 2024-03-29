import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from 'src/api/file/file.dto';
import { FileService } from 'src/api/file/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('complex-info/xlsx')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadXLSXFile(
    @Body() body: FileUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.parseComplexInfoAndPersist(file);
  }
}
