import { motion, AnimatePresence } from "framer-motion";

const AnimatedAlert = ({
    type = "error",
    message,
    show,
}: {
    type?: string;
    message: string;
    show: boolean;
}) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="w-full"
                >

                    <div role="alert" className="alert alert-error alert-soft">
                        <span>{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedAlert;
