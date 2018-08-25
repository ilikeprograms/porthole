import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IKeyword } from './keywords/keyword.interface';
import { KeywordModifiers } from './keywords/keyword-modifier-enum';
import { KeywordParser } from './keyword-parser';

const mimeType: string = 'text/csv;encoding:utf-8';
const exportFields: Array<string> = [
  'Campaign Name',
  'Ad Group',
  'Keyword'
];

interface IExportFields {
  campaignName: string
  adgroupName: string
  text: string;
  modifier: string;
}

@Injectable()
export class KeywordExportService {

  public exportKeywords(campaignName: string, adgroupName: string, keywords: Array<IKeyword>): void {
    console.log('exporting');
    const keywordsToExport = keywords.map((keyword: IKeyword) => {
      return {
        campaignName: campaignName,
        adgroupName: adgroupName,
        text: keyword.text,
        modifier: KeywordParser.keywordToText(keyword)
      };
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
    return `${exportFields[0]},${exportFields[1]},${exportFields[2]}\n`;
  }

  private convertKeywordFieldsToCsv(keywordFields: Array<IExportFields>): string {
    return keywordFields.reduce<string>((previousValue: string, keywordField: IExportFields) => {
      return previousValue + `${keywordField.campaignName},${keywordField.adgroupName},${keywordField.modifier}\n`;
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
