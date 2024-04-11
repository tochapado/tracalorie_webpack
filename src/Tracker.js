import Storage from './Storage.js';
import $ from './querySelector.js';

class CalorieTracker {
    constructor() {
        this._caloriesLimit = Storage.getCaloriesLimit(420);
        this._totalCalories = Storage.getTotalCalories(0);
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();

        $('#limit').placeholder = this._caloriesLimit;

        this._render();
    };

    // Public Methods
    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._displayNewMeal(meal);
        this._render();

        Storage.updateTotalCalories(this._totalCalories);
        Storage.updateMeals(this._meals);
    };

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._displayNewWorkout(workout);
        this._render();

        Storage.updateTotalCalories(this._totalCalories);
        Storage.updateWorkouts(this._workouts);
    };

    removeMeal(id) {
        const array = [];
        for(let i = 0; i < this._meals.length; i++) {
            if(this._meals[i].id === id) {
                this._totalCalories -= this._meals[i].calories;
                continue;
            };
            array.push(this._meals[i]);
        };
        this._meals = array;

        Storage.updateTotalCalories(this._totalCalories);
        Storage.updateMeals(this._meals);
        this._render();
    };

    removeWorkout(id) {
        const array = [];
        for(let i = 0; i < this._workouts.length; i++) {
            if(this._workouts[i].id === id) {
                this._totalCalories += this._workouts[i].calories;
                continue;
            };
            array.push(this._workouts[i]);
        };
        this._workouts = array;

        Storage.updateTotalCalories(this._totalCalories);
        Storage.updateWorkouts(this._workouts);
        this._render();
    };

    reset() {
        this._meals = [];
        this._workouts = [];
        this._totalCalories = 0;
        this._render();

        Storage.updateTotalCalories(this._totalCalories);
        Storage.updateMeals(this._meals);
        Storage.updateWorkouts(this._workouts);
    };

    setLimit(limit) {
        this._caloriesLimit = limit;
        this._render();

        Storage.setCaloriesLimit(limit);
    };

    loadItems() {
      for(let i = 0; i < this._meals.length; i++) {
        this._displayNewMeal(this._meals[i]);
      };
      for(let i = 0; i < this._workouts.length; i++) {
        this._displayNewWorkout(this._workouts[i]);
      };
    };

    // Private Methods
    _displayTotalCalories() {
        const totalCaloriesElement = $('#calories-total');
        totalCaloriesElement.textContent = this._totalCalories;
    };

    _displayCaloriesLimit() {
        const caloriesLimitElement = $('#calories-limit');
        caloriesLimitElement.textContent = this._caloriesLimit;
    };

    _displayCaloriesConsumed() {
        const caloriesConsumedElement = $('#calories-consumed');
        let caloriesConsumed = 0;
        for(let i = 0; i < this._meals.length; i++) {
            caloriesConsumed += this._meals[i].calories;
        };
        caloriesConsumedElement.textContent = caloriesConsumed;
    };

    _displayCaloriesBurned() {
        const caloriesBurnedElement = $('#calories-burned');
        let caloriesBurned = 0;
        for(let i = 0; i < this._workouts.length; i++) {
            caloriesBurned += this._workouts[i].calories;
        };
        caloriesBurnedElement.textContent = caloriesBurned;
    };

    _displayCaloriesRemaining() {
        const caloriesRemainingElement = $('#calories-remaining');
        const caloriesRemaining = this._caloriesLimit -  this._totalCalories;
        caloriesRemainingElement.textContent = caloriesRemaining;

        if(caloriesRemaining <=0) {
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-danger');
        } else {
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-light');
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-danger');
        };
    };

    _displayCaloriesProgress() {
        const caloriesProgressElement = $('#calorie-progress');
        const caloriesProgress = Math.min(this._totalCalories / this._caloriesLimit * 100, 100);

        caloriesProgressElement.style.width = `${caloriesProgress}%`;

        if(caloriesProgress === 100) {
            caloriesProgressElement.classList.add('bg-danger');
        } else {
            caloriesProgressElement.classList.remove('bg-danger');
        };
    }

    _displayNewMeal(meal) {
        const mealsEl = $('#meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id', meal.id);
        mealEl.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                >
                    ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                </div>
            </div>
        `;
        mealsEl.appendChild(mealEl);
    };

    _displayNewWorkout(workout) {
        const workoutsEl = $('#workout-items');
        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id', workout.id);
        workoutEl.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workout.name}</h4>
                <div
                    class="fs-1 lg bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                >
                    ${workout.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                </div>
            </div>
        `;
        workoutsEl.appendChild(workoutEl);
    };

    _render() {
        this._displayCaloriesLimit();
        this._displayTotalCalories();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    };
};

export default CalorieTracker;
