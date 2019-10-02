<template>
    <div class="min-width">
        <p>Months: {{ months }}</p>
        <p>CurrentDay: {{ currentDay }}</p>
        <p>CurrentYear: {{ currentYear }}</p>
        <p>CurrentMonth: {{ currentMonth }}</p>
        <p>DaysInMonth: {{ currentMonthDays }} </p>
        <p>CurrentWeek: {{ currentWeek }}</p>
        <p>PreviousMonthDays: {{ previousMonthDays }} </p>
        <p>NextMonthDays: {{ nextMonthDays }} </p>
        <p>weekdaysMin: {{ weekdaysMin }} </p>
        <p>Current value: {{currentValue}}</p>
        <!-- <p>Testing: {{testing}}</p> -->
        <!-- <p>Weeks: {{ weeks }}</p> -->
        <!-- <button v-for="day in currentMonthDays" @click="changeDay(day)" :key="day">{{ day }}</button> -->

        <!-- <button @click="previous">Prev</button>
        <button @click="next">Next</button>
         -->
        <div class="calendar-form-container">
            <div class="calendar-form-input">
                <input type="text" @input="onInput" v-model="currentValue" class="w-100 form-control">
            </div>
            <div class="calendar-form-icon">
                <b-link class="text-secondary"><i class="fa fa-calendar"></i></b-link>
            </div>
        </div>
        <div class="calendar-container">
            <div class="month-container text-center pl-3 pr-3 pt-2 pb-2">
                <div class="month-item float-left" @click="previousMonth"><b-link class="fs-12px opacity-05"><i class="fa fa-angle-left"></i></b-link></div>
                <div class="month-item"><strong class="fs-18px"><b-link @click="changeCalendarSelection">{{ calendarTitle }}</b-link></strong></div>
                <div class="month-item float-right" @click="nextMonth"><b-link class="fs-12px opacity-05"><i class="fa fa-angle-right"></i></b-link></div>
            </div>
            <div class="pl-3 pr-3 text-secondary">
                <template  v-if="currentCalendarSelection === 'IS_DAY_SELECTED'">
                    <b-row class="text-center text-secondary fs-10px bg-light">
                        <b-col class="pt-3 pb-3 opacity-05" v-for="(weekday,index) in weekdaysMin" :key="index">
                            <strong class="text-uppercase">{{weekday}}</strong>
                        </b-col>
                    </b-row>
                    <b-row  class="text-center fs-12px" v-for="(week,index) in calendarDays" :key="index">
                        <b-col :class="['calendar-day pt-3 pb-3', day.class]" v-for="(day,index1) in week" :key="index1" @click="changeDay(day.day)"> {{day.day}} </b-col>
                    </b-row>
                </template>
                <template v-else-if="currentCalendarSelection === 'IS_MONTH_SELECTED'">
                    <b-row>
                        <b-col class="p-4" cols="3" v-for="month in monthsShort" :key="month">
                            <span class="text-primary" @click="changeMonth(month)">{{month}}</span>
                        </b-col>
                    </b-row>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    const moment = require('moment');
    const chunk = require('lodash/chunk');
    const IS_DAY_SELECTED = 'IS_DAY_SELECTED';
    const IS_MONTH_SELECTED = 'IS_MONTH_SELECTED';
    const CURRENT_DAY = moment().date();
    const CURRENT_MONTH = moment().month();
    const CURRENT_YEAR = moment().year();
    export default {
        props: {
            value: null,
            format: {
                type: String,
                default: 'MM/DD/YYYY'
            }
        },
        data() {
            return {
                currentValue: null,
                currentFormat: this.format.toUpperCase(),
                months: moment.months(),
                monthsShort: moment.monthsShort(),
                weekdays: moment.weekdays(),
                weekdaysShort: moment.weekdaysShort(),
                weekdaysMin: moment.weekdaysMin(),
                currentYear:    null,
                currentMonth:   null,
                currentDay:     null,
                currentCalendarSelection: IS_DAY_SELECTED,
                calendarTitle: null,
                days: [],
            }
        },
        computed: {
            nextMonthDays() {
                let currentYear = this.currentYear;
                let currentMonth = this.currentMonth;
                if ( this.currentMonth === this.months.length - 1 ) {
                    currentYear = this.currentYear + 1;
                    currentMonth = 1;
                } else {
                    currentMonth = this.currentMonth + 2;
                }
                return moment(`${currentYear}-${currentMonth}`, "YYYY-MM").daysInMonth();
            },
            previousMonthDays() {
                let currentYear = this.currentYear;
                let currentMonth = this.currentMonth;
                if ( this.currentMonth === 0 ) {
                    currentYear = this.currentYear - 1;
                    currentMonth = this.months.length;
                } else {
                    currentMonth = this.currentMonth;
                }
                return moment(`${currentYear}-${currentMonth}`, "YYYY-MM").daysInMonth();
            },
            currentMonthDays() {
                return moment(`${this.currentYear}-${this.currentMonth + 1}`, "YYYY-MM").daysInMonth();
            },
            currentWeek() {
                return moment().day("Sunday");
            },
            currentMonthYear() {
                return `${ this.months[this.currentMonth] } ${ this.currentYear }`;
            },
            calendarDays() {
                this.days = [];
                let calendarLength = this.days.length;
                let nextMonthDays = 1;
                let day = 1;

                while( day <= this.currentMonthDays ) {
                    if ( day === 1 ) {
                        let dayNumber = this.assignDayNumber(this.nameOfDay(day));
                        if ( dayNumber !== 0 ) {
                            let calculateDay = this.previousMonthDays - dayNumber + 1;
                            for ( let previousMonthDays = calculateDay; previousMonthDays <= this.previousMonthDays; previousMonthDays++) {
                                this.days.push({ class: 'opacity-05', day: previousMonthDays });
                            }
                        }
                    }
                    if ( ( ( this.currentDay === CURRENT_DAY ) && ( this.currentDay === day ) ) && ( this.currentMonth === CURRENT_MONTH ) && ( this.currentYear === CURRENT_YEAR ) ) {
                        this.days.push({ class: 'text-primary text-bold', day: day });
                    } else {
                        this.days.push({ class: '', day: day });
                    }
                    day++;
                }
                while ( this.days.length !== 42 ) {
                    this.days.push({ class: 'opacity-05', day: nextMonthDays++ });
                }
                return chunk(this.days,7);
            },
        },
        methods: {
            onInput(e) {
                console.log('INPUTTT: ', e)
            },
            assignDayNumber(day) {
                let number = 0;
                if ( day === 'Su' ) {
                    number = 0;
                } else if ( day === 'Mo' ) {
                    number = 1;
                } else if ( day === 'Tu' ) {
                    number = 2;
                } else if ( day === 'We' ) {
                    number = 3;
                } else if ( day === 'Th' ) {
                    number = 4;
                } else if ( day === 'Fr' ) {
                    number = 5;
                } else if ( day === 'Sa' ) {
                    number = 6;
                }
                return number;
            },
            nameOfMonth(size = 'short',month) {
                return (size === 'short') ? this.monthsShort[month] : this.months[month];
            },
            nameOfDay(day) {
                return moment(`${this.currentYear}-${this.currentMonth + 1}-${day}`).format("dd");
            },
            changeCalendarSelection() {
                if ( this.currentCalendarSelection ===  IS_DAY_SELECTED) {
                    this.currentCalendarSelection = IS_MONTH_SELECTED;
                    this.calendarTitle = this.currentYear;
                }
            },
            changeMonth(month) {
                this.currentMonth = this.monthsShort.indexOf(month);
                this.currentCalendarSelection = IS_DAY_SELECTED;
                this.calendarTitle = this.currentMonthYear;
            },
            changeDay(day) {
                this.currentDay = day;
            },
            previousMonth() {
                this.currentMonth = this.currentMonth - 1;
                if ( this.currentMonth < 0 ) {
                    this.currentMonth = 11;
                    this.currentYear = this.currentYear - 1;
                }
            },
            nextMonth() {
                this.currentMonth = this.currentMonth + 1;
                if ( this.currentMonth > 11 ) {
                    this.currentMonth = 0;
                    this.currentYear = this.currentYear + 1;
                }
            },
            extractDateValue(name,date) {
                return moment(date).get(name); 
            },
            initialization() {
                this.currentYear =  (this.value) ? this.extractDateValue('year', this.value) :  moment().year();
                this.currentMonth = (this.value) ? this.extractDateValue('month', this.value) : moment().month();
                this.currentDay = (this.value) ?  this.extractDateValue('date', this.value) : moment().date();
                this.calendarTitle = this.currentMonthYear;
                this.currentValue = (this.value) ? this.value : moment({ y: this.currentYear, M: this.currentMonth, d: this.currentDay}).format(this.currentFormat);
                console.log(this.currentMonth)
                // console.log(moment(this.value).format());
            }
        },
        watch: {
            currentDay(nv) {
                // this.currentValue = moment({ y: this.currentYear, M: this.currentMonth, d: nv}).format(this.currentFormat);
            },
            currentMonth(nv) {
                this.calendarTitle = this.currentMonthYear;
                // this.currentValue = moment({ y: this.currentYear, M: nv, d: this.currentDay}).format(this.currentFormat);
            },
            currentYear(nv) {
                // this.currentValue = moment({ y: nv, M: this.currentMonth, d: this.currentDay}).format(this.currentFormat);
            },
            value(nv) {
                console.log(nv);
            }
        },
        created() {
            this.initialization();
        }
    }
</script>

<style scoped>
    .text-uppercase {
        text-transform: uppercase;
    }
    .fs-12px {
        font-size: 12px;
    }
    .fs-10px {
        font-size: 10px;
    }
    .fs-18px {
        font-size: 18px;
    }
    .opacity-05 {
        opacity: 0.5;
    }
    .primary-color {
        background-color: #20a8d8;
    }
    .month-container .month-item {
        display: inline-block;
    }
    .month-item {
        vertical-align: middle
    }
    .calendar-day:hover{
        cursor: pointer;
        background-color: #fafafa;
        color: #000000;
    }
    .active-day {
        color: #20a8d8;
        font-weight: bold;
    }
    .calendar-container {
        border: 1px solid #dee2e6 !important;
        height: 390px;
    }
    .text-bold {
        font-weight: bolder;
    }
    .min-width {
        min-width: 315px !important;
    }

    .calendar-form-container {
        position: relative;
        vertical-align: middle;
    }
    .calendar-form-icon {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 15px;
    }
    .calendar-form-icon i {
        vertical-align: -webkit-baseline-middle;
    }
</style>