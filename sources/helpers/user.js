export function user(app){
	const userObj = {
		getUser(){
			return this.userObj;
		},
		setUser(state){
			this.userObj = state;
		},
		userObj:{
			name: undefined,
			here: false,
		}
	};
	app.setService("user", userObj);
}
