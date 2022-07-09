import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

//Todo: Delete this if not used
const GenricMenu = ({ children }: { children: React.ReactNode }) => {
    return (
            <Menu>
                <Menu.Button className="absolute top-2 right-2 bg-zinc-200/10 p-2 rounded-md border-[1px] border-zinc-300/20">
                    <BsThreeDotsVertical />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute top-10 right-10 w-52 bg-zinc-300 text-rose-800 outline-none flex flex-col divide-y divide-gray-400/30 rounded-md p-4 text-base">
                        {children}
                    </Menu.Items>
                </Transition>
            </Menu>
    );
};

export default GenricMenu;
