
(function() {
    // create a luxon date object
    const {DateTime, Interval} = luxon;

    //Create a new Luxon date with .now()
    let nowLuxon = DateTime.now();

    //Container for dinamically adding content to the HTML
    let eDisplayLuxon = document.getElementById('displayLuxon');


    //1. Calculate the number of days between your birthdate and the current date
        
        //Create a luxon date for the birthday
        let birthday = DateTime.local(1991, 10, 3);

        i = Interval.fromDateTimes(birthday, nowLuxon);
        iDay = Math.round(i.length("days"));

        let nowFormatted = nowLuxon.toFormat('dd/MM/yy')
        let birthdayFormatted = birthday.toFormat('dd/MM/yy')

        eDisplayLuxon.innerHTML = `<p>1. Calculate the number of days between a birthdate ${nowFormatted} and the current date ${birthdayFormatted} = ${iDay} days</p><br><br>`

    //2. Display the number of years, months and days between your birthdate and current date

        iYear = Math.round(i.length("years"));    
        iMonth = Math.round(i.length("months")%12);
        iDayEx2 = iDay%30;
        eDisplayLuxon.innerHTML += `<p>2. Display the number of years, months and days between your birthdate and current date = ${iYear} years, ${iMonth} months, and ${iDayEx2} days</p><br><br>`


    //3. Given two dates, display the date closest to the current date

        let date1 = DateTime.local(1991, 10, 3);
        let date2 = DateTime.local(2023, 10, 15);

        let diff1 = nowLuxon.diff(date1, ['days']).toObject();
        let diff2 = nowLuxon.diff(date2, ['days']).toObject();

        console.log(diff1); console.log(diff2);

        let closestDate = (diff1.days > diff2.days) ? date2 : date1;

        let date1Formatted = date1.toFormat('dd/MM/yy');
        let date2Formatted = date2.toFormat('dd/MM/yy');
        let closestFormatted = closestDate.toFormat('dd/MM/yy');

        eDisplayLuxon.innerHTML += `<p>3. Given two dates, display the date closest to the current date:
        date 1 is ${date1Formatted}, date 2 is ${date2Formatted}, and the closest date to the current data (${nowFormatted}) is ${closestFormatted}</p><br><br>`

    //4. Given two dates, display whether the first date is before or after the second date
        let msg = '';
    
        if (date1.toMillis() > date2.toMillis()) {
            msg = "date1 is after date2.";
        } else {
            msg = "date1 is before date2.";
        }

        eDisplayLuxon.innerHTML += `<p>4. Given two dates, display whether the first date is before or after the second date:
        date 1 is ${date1Formatted}, date 2 is ${date2Formatted}, and ${msg}</p><br><br>`

    //5. Display the current time in London
        let london = nowLuxon.setZone("Europe/London").toLocaleString(DateTime.DATETIME_FULL);
        console.log(london);
        eDisplayLuxon.innerHTML += `<p>5. Display the current time in London: ${london}`;


  })();