const defaults = require(resolve('app/config/tiles/defaults'));
const merger = require(resolve('app/config/tiles/defaults-merger'));

describe('component -> main -> config -> tiles -> defaults-merger', () => {

  merge = merger(defaults);

  it('Should use the default title', done => {
    merge({ tiles: [] })
      .then(merged => {
        expect(merged.title).to.exist;
        expect(merged.title).to.equal('Team Stats');
        done();
      })
      .catch(done);
  });

  it('Should preserve the title', done => {
    merge({ title: 'title', tiles: [] })
      .then(merged => {
        expect(merged.title).to.exist;
        expect(merged.title).to.equal('title');
        done();
      })
      .catch(done);
  });

  it('Should add presets to tiles without any configuration', done => {
    merge({ tiles: [{}] })
      .then(merged => {
        expect(merged.tiles[0].presets).to.exist;
        expect(merged.tiles[0].presets.zoomFactor).to.equal(1);
        expect(merged.tiles[0].presets.scrollTop).to.equal(0);
        expect(merged.tiles[0].presets.refreshRate).to.equal(0);
        done();
      })
      .catch(done);
  });

  it('Should add presets to all tiles without any configuration', done => {
    merge({ tiles: [{}, {}] })
      .then(merged => {
        expect(merged.tiles[1].presets).to.exist;
        expect(merged.tiles[1].presets.zoomFactor).to.equal(1);
        expect(merged.tiles[1].presets.scrollTop).to.equal(0);
        expect(merged.tiles[1].presets.refreshRate).to.equal(0);
        done();
      })
      .catch(done);
  });

  it('Should merge presets and preserve the original values', done => {

    const first = { presets: { zoomFactor: 3 } };
    const second = { presets: { scrollTop: 5 } };
    const third = { presets: { refreshRate: 5 } };

    merge({ tiles: [first, second, third] })
      .then(merged => {
        expect(merged.tiles[0].presets.zoomFactor).to.equal(3);
        expect(merged.tiles[0].presets.scrollTop).to.equal(0);
        expect(merged.tiles[0].presets.refreshRate).to.equal(0);

        expect(merged.tiles[1].presets.zoomFactor).to.equal(1);
        expect(merged.tiles[1].presets.scrollTop).to.equal(5);
        expect(merged.tiles[1].presets.refreshRate).to.equal(0);

        expect(merged.tiles[2].presets.zoomFactor).to.equal(1);
        expect(merged.tiles[2].presets.scrollTop).to.equal(0);
        expect(merged.tiles[2].presets.refreshRate).to.equal(5);
        done();
      })
      .catch(done);
  });

});
