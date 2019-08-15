import { AnomalyListModule } from './anomaly-list.module';

describe('AnomalyListModule', () => {
  let anomalyListModule: AnomalyListModule;

  beforeEach(() => {
    anomalyListModule = new AnomalyListModule();
  });

  it('should create an instance', () => {
    expect(anomalyListModule).toBeTruthy();
  });
});
