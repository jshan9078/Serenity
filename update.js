/*global chrome*/
/* eslint-disable no-undef */

window.setInterval(function () {
    chrome.storage.sync.get(['key'], function(result) {
        if (result.key){
            const statustext = document.getElementById('status');
            const startButton = document.getElementById('startRecording');
            const wpm = document.getElementById('wpm');
            wpm.style.display = "inline";
            startButton.style.display = "none";
            statustext.innerText=result.key;
            chrome.storage.sync.remove('key');
        }
    })
    chrome.storage.sync.get(['transcriptkey'], function(result) {
        if (result.transcriptkey){
            const transcriptlist = document.getElementById('transcriptlist');
            var node = document.createElement('li');
            node.setAttribute('id','transcriptitem');
            var timestamp = document.createElement('p');
            timestamp.innerText=result.transcriptkey[0];
            timestamp.setAttribute('id','timestamp');
            var transcriptwords = document.createElement('p');
            transcriptwords.innerText=result.transcriptkey[1];
            transcriptwords.setAttribute('id','transcriptwords');
            node.appendChild(timestamp);
            node.appendChild(transcriptwords);
            transcriptlist.appendChild(node);
            chrome.storage.sync.remove('transcriptkey');
        }
    })
    chrome.storage.sync.get(['endkey'], function(result) {
        if (result.endkey){
            const statustext = document.getElementById('status');
            statustext.innerText='Disconnected';
            const wpm = document.getElementById('wpm');
            wpm.style.display = "none";
            chrome.storage.sync.remove('endkey');
        }
    })
    chrome.storage.sync.get(['wpmkey'], function(result) {
        if (result.wpmkey){
            const wpm = document.getElementById('wpm');
            wpm.innerText=result.wpmkey;
            chrome.storage.sync.remove('wpmkey');
        }
    })
}, 100);

