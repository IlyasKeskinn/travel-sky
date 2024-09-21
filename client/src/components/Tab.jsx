import PropTypes from 'prop-types';


// Tab component for rendering individual tab elements
const Tab = ({ label, isActive, onClick }) => {
    return (
        <div
            className={`px-4 py-2 w-40 border-b-2 ${isActive ? 'border-green-500' : 'border-gray-200'} cursor-pointer`}
            onClick={onClick}
        >
            {label}
        </div>
    )
}
Tab.propTypes = {
    label: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
}

export default Tab

