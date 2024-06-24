import * as fs from 'fs';
import { CreateBookDto } from 'src/books/dto/request/create-book.dto';
import { StoreConfig } from 'src/interfaces/use-class.interface';

export class StoreBookLocalFactory {
  storeBookLocal = (
    data: CreateBookDto,
    storeConfig: StoreConfig,
  ): void => {
    if (!fs.existsSync(storeConfig.dirname)) {
      fs.mkdirSync(storeConfig.dirname);
    }
  
    fs.appendFileSync(
      `${storeConfig.dirname}/${storeConfig.filename}`,
      JSON.stringify(data),
    );
  };  
}

export const storeBook = (): StoreBookLocalFactory => {
  return new StoreBookLocalFactory();
}