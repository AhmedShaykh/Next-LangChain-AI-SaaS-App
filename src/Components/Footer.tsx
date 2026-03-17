import { Button } from "./ui/button";

const Footer = () => {
    return (
        <div className="bg-gray-800! text-white! py-12">
            <div className="container mx-auto text-center bg-gray-800! text-white!">
                <p className="mb-4 bg-gray-800! text-white!">
                    © 2025 PodBite. All rights reserved.
                </p>

                <div className="flex justify-center space-x-4 bg-gray-800! text-white!">
                    <Button variant="link" className="text-white">
                        Privacy Policy
                    </Button>

                    <Button variant="link" className="text-white">
                        Terms of Service
                    </Button>

                    <Button variant="link" className="text-white">
                        Contact
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Footer;