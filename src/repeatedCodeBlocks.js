
// 1. The horizantal scroller in the Next List using

        https://material-ui.com/components/tabs/#scrollable-tabs


// 2. SetTimeout 

        useEffect(
        () => {
            timerToClearSomewhere.current = setInterval(() => setShowLoading(true), 800)
            return () => {
            clearInterval(timerToClearSomewhere.current)
            }
        },
        [showLoading]
        );

        setTimeout(()=>{
            setShowLoading(false)
            return () => {
                clearInterval(timerToClearSomewhere.current)
            }
        },1000);



// 3. Date format today 

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            return [year, month, day].join('-');
        }
        const date=formatDate(Date.now())


// 4. Duration left 

        const duration=(raceStartTime)=>{ 
            var left=(Date.now()-new Date(raceStartTime))-diffTime
            var delta=Math.abs(left/1000)
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            var seconds = Math.floor(delta % 60);
            if (hours>0 || hours<0) {
                if (left>0 ) {
                    if (minutes==0){
                        return(-hours+'h')
                    }
                    else return(-hours+'h'+minutes+'m')
                }
                else {
                    if (minutes==0){
                        return(hours+'h')
                    }
                } return (hours+'h'+minutes+'m')
            }
            if (hours==0 && minutes>=5){
                if (left>0){
                    return (-minutes+'m')
                }
                else return(minutes+'m')
            } 
            if (hours==0 && (minutes<=5||minutes>=-5) 
                && (minutes>0||minutes<0)) {
                    if (left>0) {
                        if (seconds==0){
                            return(-minutes+'m')
                        } else return (-minutes+'m'+seconds+'s')
                    }
                else {
                    if (seconds==0){
                        return(minutes+'m')
                    } else return (minutes+'m'+seconds+'s')
                    }
            }  
            if (hours==0 && minutes==0) {
                if (left>0) {
                    return(-seconds+'s')
                }
                else return((seconds+'s'))
            } 
        };


// 5. Race Start Time 

        const startTime=(st)=>{
            var current=new Date(st);
            var left=(Date.now()-new Date(st))-diffTime
            left=Date.now()-left+10*60*60*1000
            var delta=Math.abs(left/1000)
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            var seconds = Math.floor(delta % 60);
            if (minutes<9) {
            return (hours+":0"+minutes)
            }
            else return (hours+":"+minutes)
        }


