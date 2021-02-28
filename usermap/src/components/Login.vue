<template>
    <div>  
        <div class="message">{{message}}</div>  
        <h2>Login</h2>    
        <form>    
            <input type="text" id="username" v-model="username" /><br>    
            <input type="password" id="password" v-model="password" /><br>    
            <input type="submit" @click="handleSubmit" />    
        </form>    
    </div>
</template>

<script>
    import router from "../router"    
    import axios from "axios"  
    
    // curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
    //  result -> {"userId":1,"username":"john"}
    
    export default {    
        name: "Login",
        data(){
            return {
            
                username : "john",
                password : "changeme",
                message: "",
            }
        },  
        methods: {    
            handleSubmit(e){
                console.log('login: (e) => { ' + e)   
                console.log('this.username=' + this.username)
                console.log('this.password=' + this.password)
                let data = {    
                    username: this.username  ,    
                    password: this.password      
                } 
                console.log('data=' + data)
                console.log('axios defaults=' + JSON.stringify(axios.defaults));
            var apiHostURL= new URL(window.location.origin);
            console.log('apiHostURL=' + apiHostURL);
            apiHostURL.port="3000";
            apiHostURL.protocol=window.location.protocol;
            console.log('apiHostURL=' + apiHostURL);

                axios.post(apiHostURL+"auth/login", data)  
                    .then((response) => {    
                        console.log("Logged in response=" + JSON.stringify(response, null,3))
                        // //  result -> {"userId":1,"username":"john"}
                        //let is_admin = response.data.user.is_admin
                        
                        localStorage.setItem('user',JSON.stringify(response.data.username))
                        localStorage.setItem('jwt',response.data.userId)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            // else {
                            //     if(is_admin== 1){
                            //         this.$router.push('admin')
                            //     }
                            //     else {
                            //         this.$router.push('profile')
                            //     }
                            // }
                        }  
                        router.push("/home")    
                    })    
                    .catch((errors) => {    
                        console.log("Cannot log in" + errors)
                        this.message=errors    
                    })    
            }    
        }    
    }
</script>