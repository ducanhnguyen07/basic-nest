import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/request/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/request/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../entities/invoice.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<CreateInvoiceDto> {
    try {
      const id = createInvoiceDto.id;
      const existedInvoice = await this.invoiceRepository.findOne({
        where: {
          id: id
        }
      });

      if(existedInvoice) {
        return existedInvoice;
      } else {
        const newInvoice = await this.invoiceRepository.save(createInvoiceDto);
        return plainToInstance(CreateInvoiceDto, newInvoice);
      }
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all invoices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
