/*global chrome*/
/* eslint-disable no-undef */

import Chart from './node_modules/chart.js/auto/auto.js';


window.setInterval(function () {
    chrome.storage.sync.get(['key'], function(result) {
        if (result.key){
            const statustext = document.getElementById('status');
            const instruct = document.getElementById('instruct');
            const startButton = document.getElementById('startRecording');
            const wpm = document.getElementById('wpm');
            const wpmtext = document.getElementById('wpmtext');
            const disconnecthelp = document.getElementById('disconnecthelp');
            disconnecthelp.style.display="block";
            wpm.style.display = "block";
            instruct.style.display="block";
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
            window.scrollBy(0, 20);
            chrome.storage.sync.remove('transcriptkey');
        }
    })
    chrome.storage.sync.get(['endkey'], function(result) {
        if (result.endkey){
            
            const statustext = document.getElementById('status');
            statustext.innerText='';
            statustext.style.color = "maroon";
            const wpm = document.getElementById('wpm');
            const wpmtext = document.getElementById('wpmtext');
            const disconnecthelp = document.getElementById('disconnecthelp');
            disconnecthelp.style.display="none";
            wpm.style.display = "none";
            wpmtext.style.display="none";
            const transcriptdiv = document.getElementById('features');
            transcriptdiv.style.marginTop="100px";
            const instruct = document.getElementById('instruct');
            instruct.style.display="none";
            chrome.storage.sync.remove('endkey');
        }
    })
    chrome.storage.sync.get(['wpmkey'], function(result) {
        if (result.wpmkey){
            const wpm = document.getElementById('wpm');
            const instruct = document.getElementById('instruct');
            wpm.innerText=result.wpmkey;
            if(+result.wpmkey>=170){
                wpm.style.color="red";
                instruct.style.color = "red";
                instruct.innerText="TOO FAST";
            }
            else if (+result.wpmkey > 150 && +result.wpmkey < 170){
                wpm.style.color="orange";
                instruct.style.color = "orange";
                instruct.innerText="SLOW DOWN A BIT";
            }
            else if (+result.wpmkey >= 85 && +result.wpmkey <= 150){
                wpm.style.color="green";
                instruct.style.color = "green";
                instruct.innerText="KEEP GOING";
            }
            else if (+result.wpmkey<85){
                wpm.style.color="red";
                instruct.style.color = "red";
                instruct.innerText="TOO SLOW";
            }
            
            chrome.storage.sync.remove('wpmkey');
        }
    })
}, 10);

