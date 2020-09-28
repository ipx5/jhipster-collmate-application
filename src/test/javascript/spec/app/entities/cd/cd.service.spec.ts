import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CdService } from 'app/entities/cd/cd.service';
import { ICd, Cd } from 'app/shared/model/cd.model';
import { State } from 'app/shared/model/enumerations/state.model';

describe('Service Tests', () => {
  describe('Cd Service', () => {
    let injector: TestBed;
    let service: CdService;
    let httpMock: HttpTestingController;
    let elemDefault: ICd;
    let expectedResult: ICd | ICd[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CdService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Cd(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', State.OK, currentDate);
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

      it('should create a Cd', () => {
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

        service.create(new Cd()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cd', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            performer: 'BBBBBB',
            releaseYear: 'BBBBBB',
            diskCount: 'BBBBBB',
            medium: 'BBBBBB',
            label: 'BBBBBB',
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

      it('should return a list of Cd', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            performer: 'BBBBBB',
            releaseYear: 'BBBBBB',
            diskCount: 'BBBBBB',
            medium: 'BBBBBB',
            label: 'BBBBBB',
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

      it('should delete a Cd', () => {
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
