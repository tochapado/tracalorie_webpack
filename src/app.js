import './css/bootstrap.css';
import './css/fontawesome.css';
import './css/style.css';

import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';

import CalorieTracker from './Tracker.js';
import Meal from './Meal.js';
import Workout from './Workout.js';
import Storage from './Storage.js';

import $ from './querySelector.js';

class App {
    constructor() {
        this._tracker = new CalorieTracker();
        this._tracker.loadItems();
        this._loadEventListeners();
    };

    _loadEventListeners() {
      $('#meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));

      $('#workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));

      $('#meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));

      $('#workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));

      $('#filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'));

      $('#filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'));

      $('#reset').addEventListener('click', this._reset.bind(this));

      $('#limit-form').addEventListener('submit', this._setLimit.bind(this));
    };

    _newItem(type, e) {
        e.preventDefault();
        const name = $(`#${type}-name`);
        const calories = $(`#${type}-calories`);

        if(name.value === '' || calories.value === '') {
            alert('Please fill in all fields!.');
            return;
        };

        if(type === 'meal') {
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);
        } else if(type === 'workout') {
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
        };

        name.value = '';
        calories.value = '';

        const collapseItem = $(`#collapse-${type}`);
        const bsCollapse = new Collapse(collapseItem, {
            toggle: true,
        });
    };

    _removeItem(type, e) {
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            if(confirm('Are you sure?')) {
                const id = e.target.closest('.card').getAttribute('data-id');
                if(type === 'meal') {
                    this._tracker.removeMeal(id);
                } else if(type === 'workout') {
                    this._tracker.removeWorkout(id);
                };
                e.target.closest('.card').remove();
            };
        };
    };

    _filterItems(type, e) {
        const text = e.target.value.toLowerCase();
        const items = document.querySelectorAll(`#${type}-items h4`);
        for(let i = 0; i < items.length; i++) {
            const name = items[i].textContent;
            if(name.toLowerCase().indexOf(text) !== -1) {
                items[i]
                    .parentElement
                    .parentElement
                    .parentElement
                    .style
                    .display = 'block';
            } else if(name.toLowerCase().indexOf(text) === -1) {
                items[i]
                    .parentElement
                    .parentElement
                    .parentElement
                    .style
                    .display = 'none';
            };
        };
    };

    _reset() {
        this._tracker.reset();
        $('#meal-items').innerHTML = '';
        $('#workout-items').innerHTML = '';
        $('#filter-meals').value = '';
        $('#filter-workouts').value = '';
    };

    _setLimit(e) {
        e.preventDefault();

        const limit = $('#limit');

        if(limit.value === '') {
            alert('Please add a limit');
            return;
        };

        this._tracker.setLimit(+limit.value);
        limit.value = '';

        const modalEl = $('#limit-modal');
        const modal = Modal.getInstance(modalEl);
        modal.hide();
    };
};

const app = new App();
