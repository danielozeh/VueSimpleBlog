<template>
	<div>
		
	</div>
</template>

<script>
	export default {
    	fetch() {
        	this.$auth.logout();
        	this.$swal("",'You Have Logged out Successfully', "success");
        	this.$router.push('/')
        }
    }
</script>