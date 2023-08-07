/*global chrome*/
/* eslint-disable no-undef */

window.setInterval(function () {
    chrome.storage.sync.get(['key'], function(result) {
        if (result.key){
            const statustext = document.getElementById('status');
            const startButton = document.getElementById('startRecording');
            const wpm = document.getElementById('wpm');
            const wpmtext = document.getElementById('wpmtext');
            const disconnecthelp = document.getElementById('disconnecthelp');
            disconnecthelp.style.display="block";
            wpm.style.display = "block";
            wpmtext.style.display="block";
            startButton.style.display = "none";
            statustext.innerText=result.key;
            statustext.style.color = "green";
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
            window.scrollBy(0, 10);
            chrome.storage.sync.remove('transcriptkey');
        }
    })
    chrome.storage.sync.get(['endkey'], function(result) {
        if (result.endkey){
            const statustext = document.getElementById('status');
            statustext.innerText='Disconnected';
            statustext.style.color = "maroon";
            const wpm = document.getElementById('wpm');
            const wpmtext = document.getElementById('wpmtext');
            const disconnecthelp = document.getElementById('disconnecthelp');
            disconnecthelp.style.display="none";
            wpm.style.display = "none";
            wpmtext.style.display="none";
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
}, 10);

