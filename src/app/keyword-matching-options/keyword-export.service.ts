import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IKeyword } from './keywords/keyword.interface';
import { KeywordModifiers } from './keywords/keyword-modifier-enum';
import { Observable } from 'rxjs';




const mimeType: string = 'text/csv;encoding:utf-8';
const exportFields: Array<string> = [
  'keyword',
  'modifier'
];

interface IKeywordFields {
  text: string;
  modifier: string;
}

@Injectable()
export class KeywordExportService {

  public exportKeywords(keywords: Observable<Array<IKeyword>>): void {
    let keywordsToExport: Array<IKeywordFields>;

    keywords.pipe(take(1), map((keywordsToMap: Array<IKeyword>) => {
      return keywordsToMap.map((keyword: IKeyword) => {
        return {
          text: keyword.text,
          modifier: KeywordModifiers[keyword.modifier]
        };
      });
    })).subscribe((keywordFields: Array<IKeywordFields>) => {
      keywordsToExport = keywordFields;
    });

    const csvData: string = this.prepareHeader() + this.convertKeywordFieldsToCsv(keywordsToExport);

    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(new Blob([csvData], {
      type: mimeType
    })));
    link.setAttribute('download', this.getFileName());

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  private prepareHeader(): string {
    return `${exportFields[0]},${exportFields[1]}\n`;
  }

  private convertKeywordFieldsToCsv(keywordFields: Array<IKeywordFields>): string {
    return keywordFields.reduce<string>((previousValue: string, keywordField: IKeywordFields) => {
      return previousValue + `${keywordField.text},${keywordField.modifier}\n`;
    }, '');
  }

  private getFileName(): string {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: string = ('' + currentDate.getMonth()).padStart(2, '0');
    const day: string = ('' + currentDate.getDate()).padStart(2, '0');
    const hour: string = ('' + currentDate.getHours()).padStart(2, '0');
    const min: string = ('' + currentDate.getMinutes()).padStart(2, '0');

    return `porthole-export-${year}-${month}-${day}-${hour}:${min}.csv`;
  }
}
