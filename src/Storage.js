class Storage {
  static getCaloriesLimit(defaultLimit = 2000) {
    let caloriesLimit = defaultLimit;
    if(localStorage.getItem('caloriesLimit') !== null) {
      caloriesLimit = +localStorage.getItem('caloriesLimit');
    };
    return caloriesLimit;
  };

  static setCaloriesLimit(caloriesLimit) {
    localStorage.setItem('caloriesLimit', caloriesLimit);
  };

  static getTotalCalories(defaultCalories = 0) {
    if(localStorage.getItem('totalCalories') !== null) {
      return +localStorage.getItem('totalCalories');
    };
    return defaultCalories;
  };

  static updateTotalCalories(totalCalories) {
    localStorage.setItem('totalCalories', totalCalories);
  };

  static getMeals() {
    if(localStorage.getItem('meals') !== null) {
      return JSON.parse(localStorage.getItem('meals'));
    };
    return [];
  };

  static updateMeals(meals) {
    localStorage.setItem('meals', JSON.stringify(meals));
  };

  static getWorkouts() {
    if(localStorage.getItem('workouts') !== null) {
      return JSON.parse(localStorage.getItem('workouts'));
    };
    return [];
  };

  static updateWorkouts(workouts) {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  };
};

export default Storage;
