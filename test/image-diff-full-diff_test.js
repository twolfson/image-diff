var assert = require('assert');
var fs = require('fs');
var os = require('os');
var rimraf = require('rimraf');
var imageUtils = require('./utils/image.js');
var imageDiff = require('../lib/image-diff.js');

function runFullDiff(options) {
  before(function (done) {
    var that = this;
    imageDiff.fullDiff(options, function (err, fullResult) {
      that.err = err;
      that.fullResult = fullResult;
      done();
    });
  });
  after(function cleanup () {
    delete this.err;
    delete this.fullResult;
  });
}

describe('imageDiff.fullDiff', function () {
  describe('diffing different images', function () {
    runFullDiff({
      actualImage: __dirname + '/test-files/checkerboard.png',
      expectedImage: __dirname + '/test-files/white.png',
      diffImage: __dirname + '/actual-files/different.png'
    });

    it('calls back with differences in full result', function () {
      assert.strictEqual(this.fullResult.total, 46340.2);
      assert.strictEqual(this.fullResult.percentage, 0.707107);
    });
  });

  describe('diffing the same image', function () {
    runFullDiff({
      actualImage: __dirname + '/test-files/checkerboard.png',
      expectedImage: __dirname + '/test-files/checkerboard.png',
      diffImage: __dirname + '/actual-files/same.png'
    });

    it('calls back with no differences in full result', function () {
      assert.strictEqual(this.fullResult.total, 0);
      assert.strictEqual(this.fullResult.percentage, 0);
    });
  });
});
