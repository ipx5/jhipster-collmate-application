import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DvdService } from 'app/entities/dvd/dvd.service';
import { IDvd, Dvd } from 'app/shared/model/dvd.model';
import { State } from 'app/shared/model/enumerations/state.model';

describe('Service Tests', () => {
  describe('Dvd Service', () => {
    let injector: TestBed;
    let service: DvdService;
    let httpMock: HttpTestingController;
    let elemDefault: IDvd;
    let expectedResult: IDvd | IDvd[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DvdService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Dvd(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', State.OK, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            added: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Dvd', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            added: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            added: currentDate,
          },
          returnedFromService
        );

        service.create(new Dvd()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Dvd', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            releaseYear: 'BBBBBB',
            diskCount: 'BBBBBB',
            format: 'BBBBBB',
            lang: 'BBBBBB',
            state: 'BBBBBB',
            added: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            added: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Dvd', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            releaseYear: 'BBBBBB',
            diskCount: 'BBBBBB',
            format: 'BBBBBB',
            lang: 'BBBBBB',
            state: 'BBBBBB',
            added: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            added: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Dvd', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
