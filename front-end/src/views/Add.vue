<template>
  <div class="add">
    <h1>Add an Activity</h1>
    <div class="addbox">
        <div class="form">
            <p>Activity:</p><input v-model="name" placeholder="Basketball">
            <br>
            <p>Time:</p>
            <div class="wrapper">
                <datetime 
                v-model="date"
                type="datetime"
                :use12-hour="true"
                :auto="true"
                style="width:300px;"
                placeholder="May 13, 2021, 4:00 PM"
            ></datetime>
            </div>
            <br>
            <p>Total people needed:</p><input v-model="peopleNeeded" placeholder="10">
            <br>
            <p>People already going: </p><input v-model="peopleGoing" placeholder="6">
            <br>
            <p>City: </p><input v-model="city" placeholder="Provo">
            <br>
            <p>Address: </p><textarea v-model="address" placeholder="945 E 700 N"></textarea>
        </div>
        <button @click="submitActivity">Add</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'Add',
    data() {
        return {
            name: "",
            city: "",
            peopleNeeded: "",
            peopleGoing: "", 
            date: "",
            address: "",
            activities: [],
        }
    },
    computed: {
        
    },
    created() {
        this.getActivities;

    },
    methods: {
        async getActivities() {
            try {
                let response = await axios.get("/api/activities");
                this.activities = response.data;
                return true;
            } catch (error) {
                // console.log(error);
            }
        },
        async submitActivity() {
            try {
                await axios.post('/api/activities', {
                    name: this.name,
                    city: this.city,
                    peopleNeeded: this.peopleNeeded,
                    peopleGoing: this.peopleGoing,
                    date: this.date,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    address: this.address,
                });
            } catch (error) {
                // console.log(error);
            }
        },
    }
}
</script>

<style>
    html body div#app div#content div.add div.addbox div.form div.wrapper div.vdatetime input.vdatetime-input {
        width: 260px;
        height: 20px;
        font-size: 11pt;
        text-align: center;
    }
</style>

<style scoped>
    .addbox {
        border: 2px solid #79a3b1;
        border-radius: 10px;
        max-width: 400px;
        margin: auto;
        padding: 0 20px 26px 20px;
        display: flex;
        flex-direction: column;
    }
    p {
        margin: 21px 0 6px 0;
        font-size: 14pt;
    }

    input {
        width: 260px;
        height: 20px;
        font-size: 11pt;
        text-align: center;
    }

    .wrapper {
        display: inline-block;
    }

    .vdatetime-input {
        width: 300px !important;
    }
    textarea {
        width: 260px;
        font-size: 11pt;
        padding: 5px;
    }

    button, input[type="submit"], input[type="reset"] {
        background: none;
        background-color: #456268;
        color: #fcf8ec;
        border: none;
        padding: 5px 20px;
        border-radius: 2px;
        font: inherit;
        font-size: 15pt;
        cursor: pointer;
        outline: inherit;
        margin-top: 10px;
        min-width: 274px;
        margin: auto;
        margin-top: 20px;
        
}

button:hover {
  color: #FFF;
  background-color: #79a3b1;
}

    
</style>
