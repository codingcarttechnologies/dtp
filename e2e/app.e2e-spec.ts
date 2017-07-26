import { DexenTelemetryPage } from './app.po';

describe('dexen-telemetry App', function() {
  let page: DexenTelemetryPage;

  beforeEach(() => {
    page = new DexenTelemetryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
