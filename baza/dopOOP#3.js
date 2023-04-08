class CarService {

    static DefaultWorkingHours = {
        from: '9:00',
        till: '20:00',
    }

    constructor(name, workingHours = CarService.DefaultWorkingHours ) {
        this.name = name;
        this.workingHours = workingHours;
    }

    repairCar(carName){
        if (carName === undefined || typeof carName != 'string'){
            console.error(`Вам необходимо указать название машины, чтобы ее отремонтировать`);
        }else{
            let hours = new Date().getHours();
            let [startTime, endTime] = Object.values(this.workingHours).map(item => item.split(':'));
            if (Number(startTime[0]) < hours && Number(endTime[0]) > hours){
                console.log(`Сейчас отремонтируем вашу машину ${carName}! Ожидайте пожалуйста`);
            }else{
                console.log(`К сожалению, мы сейчас закрыты. Приходите завтра`);
            }
        }
    }
}

const carService = new CarService('RepairCarNow', { from: '8:00', till: '20:00' });
carService.repairCar('BMW');

const carNewService = new CarService('lekLol', {from: '08:00', till: '19:00'});
carNewService.repairCar('Мазда 3 и 5')

