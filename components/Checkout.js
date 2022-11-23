import firestore from '@react-native-firebase/firestore';

const checkSchedule = async(shop, date, hour, minute) => {
    let schedule_data = await firestore().collection('schedule').doc(shop).get();
    if (schedule_data._exists){
        if (schedule_data._data[date] !== undefined){
            if (schedule_data._data[date][hour] !== undefined){
                if (schedule_data._data[date][hour][minute] !== undefined){
                    return true
                }
            }
        }
    }
    return false;
}

let tempData = {
    user:'',
    shop:'',
    shopname:'',
    services:[{name:'', price:''}],
    price:'',
    date:'',
    hour:'',
    minute:'',
    name:'',
    phone:''
}

const makeApppointment = async(data) => {
    let isAvailable = checkSchedule(data.shop, data.date, data.hour, data.minute);
    if (isAvailable){
        const scheduleAddData = {
            name:data.name,
            phone: data.phone,
            price: data.price,
            services:data.services
        };
        22-02-2022

        let convDate = new Date(data.date.slice(6), data.date.slice(3,5), data.date.slice(0,2), data.hour, data.minute)
        const userAddData = {
            date:convDate,
            prices:data.prices,
            services:data.services,
            shopid:data.shop,
            shopname:data.shopname
        }


        let schedule_data = await firestore().collection('schedule').doc(data.shop).get();
        let user_data = await firestore().collection('users').doc(data.user).get();
        if (schedule_data._exists){
            schedule_data._data[data.date][data.hour][data.minute] = scheduleAddData;
            if (user_data._exists){
                user_data._data.bookings.push(userAddData)

                firestore()
                .collection('schedule')
                .doc(data.shop)
                .set(schedule_data._data)
                .then(() => {
                    console.log('Schedule Updated');
                });

                firestore()
                .collection('users')
                .doc(data.user)
                .set(user_data._data)
                .then(() => {
                    console.log('User Updated');
                });

                return true;
            }
        }
    }
    return false;
}

const doCheckout = () => {
    makeApppointment.then(alert('Schedule Made'));
}