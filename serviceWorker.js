  chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      var paths = msg.paths;
      var transcriptpaths = msg.transcriptpaths;
      var endpaths = msg.endpaths;
      var wpmpaths = msg.wpmpaths;
      chrome.storage.sync.set(
        {
          key: paths,
          transcriptkey: transcriptpaths,
          endkey: endpaths,
          wpmkey: wpmpaths,
        });
    });
  });

  