document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#myCheckbox').addEventListener('click', function (){
        
        
        var myCheckBox = document.querySelector('#myCheckbox');
        
        var time = run(myCheckBox.checked);
        
        document.querySelector('#time').innerHTML = time ? time : 'Impossível determinar';
        
    });
    
    
    function run(onlyUnassistedVideos){
        
        var timeSeconds = 0;
        
        chrome.tabs.getCurrent(function(tab) {
            
            var timestampDivList = document.querySelectorAll("#pl-load-more-destination");
            
            if(!timestampDivList || !timestampDivList.length) {
                // alert('Nenhuma lista encontrada nesta página');
                return undefined;
            }
            
            for (var i of timestampDivList[0].children) {
        
                var percentageGreaterOrAlmostHundred = false;
        
                if (onlyUnassistedVideos) {
        
                    for (var l of i.children) {
        
                        if (l.className == "pl-video-thumbnail") {
        
                            // resume-playback-progress-bar: class who only have percentage relative to quantity of watched video
                            for (var m of l.children[0].children) {
                                if (m.className == "resume-playback-progress-bar") {
                                    var percent = m.style.cssText.replace(/\D/g, '');
        
                                    console.log('procentagem assitida: ', percent);
        
                                    if (percent >= 95) {
                                        percentageGreaterOrAlmostHundred = true;
                                    }
        
                                }
                            }
                        }
        
                    }
                }
        
                for (var j of i.children) {
        
                    // pl-video-time: class relative to time video
                    if (j.className == "pl-video-time") {
        
                        var timeParts = j.innerText.split(":");
        
                        if (onlyUnassistedVideos && !percentageGreaterOrAlmostHundred) {
        
                            timeSeconds += (timeParts[0] * 60) + parseInt(timeParts[1]);
                        } else if (!onlyUnassistedVideos) {
        
                            timeSeconds += (timeParts[0] * 60) + parseInt(timeParts[1]);
                        }
        
                    }
        
                }
        
            }
        
            var hours = (timeSeconds / 60) / 60;
            var minutes = (timeSeconds / 60) % 60;
            var seconds = (timeSeconds % 60);
        
            var result = parseInt(hours) + ":" + parseInt(minutes) + ":" + parseInt(seconds);
        
            console.log('result: ', result);
        
            return result;
        });

    }

    
});