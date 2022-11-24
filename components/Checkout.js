import firestore from '@react-native-firebase/firestore';

const checkSchedule = async(shop, date, hour) => {
    let schedule_data = await firestore().collection('schedule').doc(shop).get();
    if (schedule_data._exists){
        if (schedule_data._data[date] !== undefined){
            if (schedule_data._data[date][hour] !== undefined){
                return false
            }
        }
    }
    return true;
}

const makeApppointment = async(data) => {
    let isAvailable = await checkSchedule(data.shop, data.date, data.hour);
    console.log(isAvailable);
    if (isAvailable){
        const scheduleAddData = {
            name:data.name,
            phone: data.phone,
            price: data.price,
            services:data.services
        };

        let convDate = new Date(data.date.slice(6), parseInt(data.date.slice(3,5))-1, data.date.slice(0,2), data.hour, '00')
        const userAddData = {
            date:convDate,
            price:data.price,
            services:data.services,
            shopid:data.shop,
            shopname:data.shopname
        }


        let schedule_data = await firestore().collection('schedule').doc(data.shop).get();
        let user_data = await firestore().collection('users').doc(data.user).get();
        if (schedule_data._exists){
            console.log('here');
            console.log(schedule_data._data[data.date]);
            if (schedule_data._data[data.date] !== undefined){
                if (schedule_data._data[data.date][data.hour] === undefined){
                    schedule_data._data[data.date][data.hour] = scheduleAddData
                }
            }else{
                let temp = {[data.hour]:scheduleAddData}
                schedule_data._data[data.date] = temp
            }
            // schedule_data._data[data.date][data.hour] = scheduleAddData;
            console.log('here2');
            console.log(schedule_data);
            console.log('here4');
            if (user_data._exists){
                let userDataClone = user_data._data
                userDataClone.bookings.push(userAddData)

                console.log("here5");

                firestore()
                .collection('schedule')
                .doc(data.shop)
                .set(schedule_data._data)
                .then(() => {
                    console.log('Schedule Updated');
                });

                console.log('here6');

                firestore()
                .collection('users')
                .doc(data.user)
                .set(userDataClone)
                .then(() => {
                    console.log('User Updated');
                });

                return {
                    success: true,
                };
            }
            return {
                success: false,
                reason: 'An error occured. Try again later!'
            }
        }
    }
    return {
        success: false,
        reason: "There is already an appointment for the required time!"
    };
}

const doCheckout = () => {
    makeApppointment.then(alert('Schedule Made'));
}

export {makeApppointment};