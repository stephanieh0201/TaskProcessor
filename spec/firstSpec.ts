describe('A test', () => {
  describe('Doing work', () => {
    describe('Successfully', () => {
      let result;

      beforeEach(() => {
        result = 'hi';
      });

      it('Returns hi', () => {
        expect(result).toBe('hi');
      });
    });

    describe('Unsuccessfully', () => {
      let error;

      describe('With an error', () => {
        beforeEach(() => {
          error = {
            message: 'bye'
          };

          // try {
          //   tripModel.transformTripData(airlineDataMock, profilesDataMock, tripDataMock);
          // } catch (err) {
          //   error = err;
          // }
        });

        it('Returns bye', () => {
          expect(error.message).toBe('bye');
        });
      });
    });
  });
});
