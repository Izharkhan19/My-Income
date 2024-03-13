import moment from "moment/moment";

export const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
};

export const dateFormate = (date) => {
    if (date !== undefined && date !== null) {
        return moment(date).format("DD-MM-YYYY")
    }
};