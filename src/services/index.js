import {
    signUpService, signInService, setNewPasswordService,
    activateAccountService, resetPasswordService,
} from './auth.js';
import { getStatesService, getCitiesService, getPlacesService } from './places.js';
import {
    getMyProfileService, updateProfileService, getUserProfileService,
    sendPhoneVerificationCodeService, checkPhoneVerificationCodeService,
} from './profile.js';
import {
    addCarImageService, addCarService, getCarListService,
    removeCarService, getCarService, editCarService, removeCarImageService,
} from './car.js';
import {
    createRideService, getMyRidesListService, getRidesListService,
    getRideService, bookRideService, requestRideService,
    getRideRequestsListService, getMyRideRequestsListService,
    getMyBookingsListService, getRideRequestService,
    rideComplainService, cancelRideService, cancelBookingService,
    cancelRideRequestService,
    rideRequestDriverPhoneService, bookingRequestPassengerPhoneService,
} from './rides.js';
import { addReviewService, getReviewsListService } from './reviews.js';
import { getFlatpageService } from './flatpages.js';

export default {
    signUpService,
    signInService,
    activateAccountService,
    resetPasswordService,
    setNewPasswordService,
    getStatesService,
    getCitiesService,
    getPlacesService,
    getUserProfileService,
    getMyProfileService,
    updateProfileService,
    sendPhoneVerificationCodeService,
    checkPhoneVerificationCodeService,
    addCarImageService,
    addCarService,
    getCarListService,
    getCarService,
    editCarService,
    removeCarImageService,
    removeCarService,
    createRideService,
    getMyRidesListService,
    getMyRideRequestsListService,
    getMyBookingsListService,
    getRidesListService,
    getRideRequestsListService,
    getRideService,
    getRideRequestService,
    bookRideService,
    requestRideService,
    rideComplainService,
    cancelRideService,
    cancelBookingService,
    cancelRideRequestService,
    rideRequestDriverPhoneService,
    bookingRequestPassengerPhoneService,
    addReviewService,
    getReviewsListService,
    getFlatpageService,
};
