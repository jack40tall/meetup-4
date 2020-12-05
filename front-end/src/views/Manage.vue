<template>
  <div class="home">
    <div class="filter">
      <h2>Activites:</h2>
      <a @click="select('All')" href="#">All</a>
      <div class="filter-item" v-for="category in categories" :key="category.id">
        <a @click="select(category)" href="#">{{category}}</a>
      </div>
    </div>
    <div class="activities">
      <div class="activity" v-for="activity in activitiesInCategory" :key="activity.id">
        <h3 id="date">{{activity.date | formatDate}}</h3>
        <h2 id="name">{{activity.name}} in {{activity.city}}</h2>
        <h2 id="numPeople">{{activity.peopleGoing}} going / {{activity.peopleNeeded}} needed</h2>
        <p id="address">{{activity.address}}</p>
        <button @click="removeActivity(activity)">REMOVE</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: "Manage",
  data() {
    return {
      activities: [],
      categories: [],
      selectedCategory: "All",
    }
  },
  created() {
    this.getActivities();
  },
  computed: {
    activitiesInCategory: function () {
      if (this.selectedCategory === "All" ) {
        return this.activities;
      }
      else {
        return this.activities.filter(activity => activity.name === this.selectedCategory);
      }
    }
  },
  methods: {
    async getActivities() {
      try {
        let response = await axios.get("/api/activities");
        this.activities = response.data;
        this.getCategories(); //Initialize categories
      } catch (error) {
        // console.log(error);
      }
    },
    getCategories() {
      this.categories = [];

      let i;
      for (i = 0; i < this.activities.length; i++) {
        if(!this.categories.includes(this.activities[i].name)) {
          this.categories.push(this.activities[i].name);
        }
      }
    },
    isSelected(category) {
      if((this.selectedCategory === "") || (this.selectedCategory === category)) {
        return true;
      }
      else {
        return false;
      }
    },
    select(selectedCategory) {
      this.selectedCategory = selectedCategory;
    },
    async removeActivity(activity) {
      try {
        await axios.delete("/api/activities/" + activity._id, {
        });
        this.getActivities();
        this.getCategories();
        // console.log(this.categories);
      } catch (error) {
        // console.log(error);
      }
    }
  }
};
</script>

<style scoped>
  .home {
    display: flex;
  }
  .filter {
    border-right: 3px solid #456268;
    min-width: 300px;
    min-height: 100vh;
  }

  .activities {
    /* border: 3px solid red; */
    display: flex;
    flex-wrap: wrap;
    padding: 50px;
  }

  .activity {
    border: 2px solid #79a3b1;
    box-shadow: -3px 5px #C0C0C0;
    border-radius: 5%;
    width: 280px;
    height: 340px;
    margin: 20px;
    padding: 10px;
  }

  .name {
    text-transform: capitalize;
  }
  button, input[type="submit"], input[type="reset"] {
	background: none;
  background-color: #b7410e;
	color: #fcf8ec;
	border: none;
	padding: 5px 20px;
  border-radius: 8px;
	font: inherit;
  font-size: 15pt;
	cursor: pointer;
	outline: inherit;
  margin-top: 10px;
}

button:hover {
  color: #FFF;
  background-color: #79a3b1;
}

#date {
  margin: 16px 0 5px 0;
  color: #b7410e;
}
#name {
  margin: 0;
  height:80px;
}
#numPeople {
  margin: 0;
}
#address {
  height: 60px;
}

.filter-item {
  width: 100%
}
.filter a {
  box-sizing: border-box;
  display: block;
  color: #456268;
  height: 46px;
  width: 100%;
  font-size: 15pt;
  padding: 0 20px;
  line-height: 46px;
}

.filter a:hover {
  background-color: #456268;
  color: #fff;
}


</style>