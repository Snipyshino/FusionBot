import { DataDisplayModule } from './data-display.module';

describe('DataDisplayModule', () => {
  let dataDisplayModule: DataDisplayModule;

  beforeEach(() => {
    dataDisplayModule = new DataDisplayModule();
  });

  it('should create an instance', () => {
    expect(dataDisplayModule).toBeTruthy();
  });
});
