function begin(){
    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth'
        });
        calendar.render();
      });
}
function calendar() {
    document.addEventListener("DOMContentLoaded", function () {
        axios.get("https://localhost:7014/api/Calander").then((res) => {
            var calendarEl = document.getElementById("calendar");
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "dayGridMonth",
                events: res.data,
            });
            calendar.render();
        });
    });
}

function getEvents() {
    axios.get("https://localhost:7014/api/Calander").then((res) => {
        var calendarEl = document.getElementById("calendar");
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",
            events: res.data,
        });
        calendar.render();
    });
}
//פונקציה שמרוקנת את המסך
function deleteElemets() {
    const eve = document.getElementById("event");
    while (eve.hasChildNodes()) {
        eve.removeChild(eve.lastChild);
    }
}
function addEvents() {
    //יצירת אינפוטים וכפתור שמירה
    let par = document.createElement("p");
    let nameOfEvent = document.createElement("input");
    let dateOfEvent = document.createElement("input");
    let buttonForEvent = document.createElement("button");
    par.innerHTML = "enter name of event and date"
    buttonForEvent.innerHTML = "save"
    nameOfEvent.placeholder = "Name";
    nameOfEvent.classList = "name";
    dateOfEvent.placeholder = "Date";
    dateOfEvent.classList = "date";
    dateOfEvent.type = "date";
    buttonForEvent.classList = "btn1";
    document.querySelector("#event").append(par);
    document.querySelector("#event").append(nameOfEvent);
    document.querySelector("#event").append(dateOfEvent);
    document.querySelector("#event").append(buttonForEvent);
    const but = document.querySelector(".btn1");
    but.onclick = () => {
        const name = document.querySelector(".name");
        const date = document.querySelector(".date");
        axios.post(`https://localhost:7014/api/Calander`, {
            "title": name.value,
            "start": date.value
        }).then(() => {
            //רענון הלוח
            getEvents()
            //מחיקת אינפוטים
            deleteElemets()
        })
    };
}
function updateEvents() {
    //קבלת הרשימה לתגית של סלקט
    axios.get("https://localhost:7014/api/Calander").then((res) => {
        let label = document.createElement("label");
        label.innerHTML = "choose task to update"
        document.querySelector("#event").append(label);
        let select1 = document.createElement("select");
        select1.classList = "select1"
        document.querySelector("#event").append(select1);
        for (let e of res.data) {
            let list = document.createElement("option");
            list.value = e.id;
            list.innerHTML = e.title + " " + e.start;
            document.querySelector(".select1").append(list);
        }
        let buttonForupdate = document.createElement("button");
        buttonForupdate.innerHTML = "update";
        buttonForupdate.classList = "btn1";
        document.querySelector("#event").append(buttonForupdate);
        const butUpdate = document.querySelector(".btn1");
        butUpdate.onclick = () => {
            let par = document.createElement("p");
            let nameOfEvent = document.createElement("input");
            let dateOfEvent = document.createElement("input");
            let buttonForEvent = document.createElement("button");
            par.innerHTML = "enter title of event and date for update"
            buttonForEvent.innerHTML = "save"
            nameOfEvent.placeholder = "Name";
            nameOfEvent.classList = "name";
            dateOfEvent.placeholder = "Date";
            dateOfEvent.type = "date";
            dateOfEvent.classList = "date";
            buttonForEvent.classList = "btn2";
            document.querySelector("#event").append(par);
            document.querySelector("#event").append(nameOfEvent);
            document.querySelector("#event").append(dateOfEvent);
            document.querySelector("#event").append(buttonForEvent);
            const but2 = document.querySelector(".btn2");
            but2.onclick = () => {
                const name = document.querySelector(".name");
                const date = document.querySelector(".date");
                console.log(select1.value)
                axios.put(`https://localhost:7014/api/Calander/${select1.value}`, {
                    "title": name.value,
                    "start": date.value
                }).then(() => {
                    getEvents()
                    deleteElemets()
                })
            };
        }
    })
}
function deleteEvents() {
    axios.get("https://localhost:7014/api/Calander").then((res) => {
        let par = document.createElement("label");
        par.innerHTML = "choose task to delete"
        document.querySelector("#event").append(par);
        let select1 = document.createElement("select");
        select1.classList = "select1"
        document.querySelector("#event").append(select1);
        for (let e of res.data) {
            let list = document.createElement("option");
            list.value = e.id;
            list.innerHTML = e.title + " " + e.start;
            document.querySelector(".select1").append(list);
        }
        let buttonFordelete = document.createElement("button");
        buttonFordelete.innerHTML = "delete";
        buttonFordelete.classList = "bb";
        document.querySelector("#event").append(buttonFordelete);
        console.log(select1.value);
        const butDelete = document.querySelector(".bb");
        butDelete.onclick = () => {
            axios.get("https://localhost:7014/api/Calander").then((res) => {
                for (let ev of res.data) {
                    if (ev.id == select1.value) {
                        axios.delete(`https://localhost:7014/api/Calander/${select1.value}`).then(() => {
                            getEvents()
                            deleteElemets()
                        })
                    }
                }
            })
        }
    })
}
begin()
calendar()



