// FlightSelectionDialog.js
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FlightTile from '@/components/FlightTile';
import PropTypes from 'prop-types';


const FlightSelectionDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    selectedDepartureFlight,
    selectedReturnFlight,
    returnFetchURL,
    handleToConfirmBooking
}) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Your Selection</DialogTitle>
                    <DialogDescription>
                        {selectedDepartureFlight ? (
                            <div>
                                <h6 className='mb-2'>Departure Flight:</h6>
                                <FlightTile flight={selectedDepartureFlight} isShowBookingButton={false} />
                            </div>
                        ) : (
                            <div>
                                <h6 className='mb-2'>Departure Flight:</h6>
                                <p>Please select a flight to make a reservation</p>
                            </div>
                        )}
                        {returnFetchURL && (
                            selectedReturnFlight ? (
                                <div className='mt-2'>
                                    <h6 className='mb-2'>Return Flight:</h6>
                                    <FlightTile flight={selectedReturnFlight} isShowBookingButton={false} />
                                </div>
                            ) : (
                                <div>
                                    <h6 className='mb-2'>Return Flight:</h6>
                                    <p>Please select a return flight to make a reservation</p>
                                </div>
                            )
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={handleToConfirmBooking}
                        disabled={!selectedDepartureFlight || (returnFetchURL && !selectedReturnFlight)}
                        className="mt-4 md:mt-0"
                    >
                        Confirm
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)} variant="outline">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


FlightSelectionDialog.propTypes = {
    isDialogOpen: PropTypes.bool.isRequired,
    setIsDialogOpen: PropTypes.func.isRequired,
    selectedDepartureFlight: PropTypes.object,
    selectedReturnFlight: PropTypes.object,
    returnFetchURL: PropTypes.string,
    handleToConfirmBooking: PropTypes.func.isRequired,
};

export default FlightSelectionDialog;
