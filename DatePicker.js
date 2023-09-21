class DatePicker {
    constructor(id, callback) {
        this.container = document.getElementById(id);
        this.callback = callback;
        this.selectedDate = null;
        this.currentDate = new Date(); // Each DatePicker instance has its own currentDate

        // Create an initial date picker HTML structure.
        this.render();
    }

    render() {
        // Clear the container before rendering a new date picker.
        this.container.innerHTML = '';

        // Create the calendar container.
        const calendar = document.createElement('div');
        calendar.classList.add('datepicker-calendar');
        this.container.appendChild(calendar);

        // Add month and year header.
        const header = document.createElement('div');
        header.classList.add('datepicker-header');
        header.innerHTML = `
            <span class="prev-month">&lt;</span>
            <span class="current-month">${this.getMonthName(this.currentDate.getMonth())} ${this.currentDate.getFullYear()}</span>
            <span class="next-month">&gt;</span>
        `;
        calendar.appendChild(header);

        // Add day labels (Su, Mo, Tu, etc.).
        const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const dayLabels = document.createElement('div');
        dayLabels.classList.add('datepicker-day-labels');
        daysOfWeek.forEach((day) => {
            const dayLabel = document.createElement('span');
            dayLabel.textContent = day;
            dayLabels.appendChild(dayLabel);
        });
        calendar.appendChild(dayLabels);

        // Calculate the first day of the month and the total days in the month.
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();

        // Create the grid for days.
        const daysGrid = document.createElement('div');
        daysGrid.classList.add('datepicker-days-grid');
        calendar.appendChild(daysGrid);

        // Calculate how many days to display from the previous month.
        const startDay = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
        const daysFromPrevMonth = (startDay === 0 ? 7 : startDay) - 1;

        // Create previous month's days.
        for (let i = daysFromPrevMonth; i > 0; i--) {
            const prevMonthDay = document.createElement('span');
            prevMonthDay.classList.add('datepicker-day', 'prev-month-day');
            prevMonthDay.textContent = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1 - i).getDate();
            daysGrid.appendChild(prevMonthDay);
        }

        // Create current month's days.
        for (let i = 1; i <= daysInMonth; i++) {
            const currentMonthDay = document.createElement('span');
            currentMonthDay.classList.add('datepicker-day', 'current-month-day');
            currentMonthDay.textContent = i;
            daysGrid.appendChild(currentMonthDay);

            // Add a click event listener to invoke the callback on day click.
            currentMonthDay.addEventListener('click', () => {
                this.onDayClick(i, this.currentDate);
            });
        }

        // Calculate how many days to display from the next month.
        const daysFromNextMonth = 42 - daysFromPrevMonth - daysInMonth;

        // Create next month's days.
        for (let i = 1; i <= daysFromNextMonth; i++) {
            const nextMonthDay = document.createElement('span');
            nextMonthDay.classList.add('datepicker-day', 'next-month-day');
            nextMonthDay.textContent = i;
            daysGrid.appendChild(nextMonthDay);
        }

        // Add navigation event listeners.
        const prevMonthBtn = header.querySelector('.prev-month');
        const nextMonthBtn = header.querySelector('.next-month');

        prevMonthBtn.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render();
        });

        nextMonthBtn.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render();
        });
    }

    getMonthName(monthIndex) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        return monthNames[monthIndex];
    }

    onDayClick(day, date) {
        const selectedDate = {
            month: date.getMonth() + 1,
            day,
            year: date.getFullYear(),
        };
        this.callback(this.container.id, selectedDate);
    }
}

// Usage example
var datePicker1 = new DatePicker('datepicker1', function (id, fixedDate) {
    console.log(
        'DatePicker with id',
        id,
        'selected date:',
        fixedDate.month + '/' + fixedDate.day + '/' + fixedDate.year,
    );
});
datePicker1.render();

var datePicker2 = new DatePicker('datepicker2', function (id, fixedDate) {
    console.log(
        'DatePicker with id',
        id,
        'selected date:',
        fixedDate.month + '/' + fixedDate.day + '/' + fixedDate.year,
    );
});
datePicker2.currentDate = new Date('1/1/2009'); // Set the initial date to January 1, 2009
///datePicker2.render();
