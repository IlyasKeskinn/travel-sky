import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import PropTypes from 'prop-types';

const avatarVariants = cva(
    "rounded-full group cursor-pointer flex justify-center items-center",
    {
        variants: {
            size: {
                xs: "h-8 w-8", // 32px x 32px
                sm: "h-12 w-12", // 48px x 48px
                md: "h-24 w-24", // 96px x 96px
                lg: "h-32 w-32", // 128px x 128px
            },
        },
        defaultVariants: {
            size: "md", // Default size
        },
    }
);

const imageVariants = cva("rounded-full onject-fit object-cover", {
    variants: {
        size: {
            xs: "h-8 w-8", // 32px x 32px
            sm: "h-12 w-12", // 48px x 48px
            md: "h-24 w-24", // 96px x 96px
            lg: "h-32 w-32", // 128px x 128px
        },
    },
    defaultVariants: {
        size: "md", // Default size
    },
});


/**
 * The Avatar component is a simple component that renders an
 * image with a given size. If no image URL is provided, it will
 * default to the avatar.png image in the assets folder.
**/
const Avatar = ({ size = "md", imgURL = "", className }) => {
    return (
        <div
            className={cn(
                avatarVariants({ size }), // Avatar size classes
                className // Additional custom classes passed via props
            )}
        >
            {/* If no image URL is provided, use the default avatar image */}
            <img
                src={imgURL ? imgURL : "/assets/avatar.png"}
                width={
                    size === "xs" ? 32 : size === "sm" ? 48 : size === "md" ? 96 : 128
                }
                height={
                    size === "xs" ? 32 : size === "sm" ? 48 : size === "md" ? 96 : 128
                }
                alt="profile_avatar"
                className={cn(
                    imageVariants({ size }), // Avatar size classes
                    className // Additional custom classes passed via props
                )}
            />
        </div>
    );
};



Avatar.propTypes = {
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']).isRequired,
    imgURL: PropTypes.string,
    className: PropTypes.string,
};

export default Avatar;