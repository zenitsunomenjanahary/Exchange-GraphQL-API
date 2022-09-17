import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Toy from "../models/Toy.js";

export const users = ()=> User.find();

export const user = (args)=> User.findById(args.id).populate("toys");

export const registerUser = async (args) => {
    const { name, email, phone, password } = args.userInput;

    // check if email already in use
    const existingUser = await User.findOne({ email });

    if(existingUser) return;

    // generate salt to hash password
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name,email,phone, password: hashedPassword
    });
    return user.save();
}

export const loginUser = async(args) => {
    const { email , password } = args;

    const user = await User.findOne({ email });
    
    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) return

    return user;

}

// TOY Controllers
export const toys = ()=> Toy.find();

export const toy = (args)=> Toy.findById(args.id);

export const createToy = async(args)=> {
    const { name, photo, owner } = args.toyInput;

    const toy = new Toy({ name, photo, owner });
    await toy.save();

    // update user toys
    const user = await User.findById(owner);
    user.toys.push(toy);
    await user.save();

    return toy;
}

export const updateToy = async(args)=> {
    const { id, name, photo } = args;
    return Toy.findByIdAndUpdate(id,{ name, photo });
}

export const updateOwnerToy = async(args) =>{
    const { id, owner } = args;

    const toy = await Toy.findById(id);
    const user = await User.findById(toy.owner);
    
    user.toys.pull(toy);
    await user.save();

    toy.owner = owner;
    await toy.save();

    const newOwner = await user.findById(owner);
    newOwner.push(toy);
    await newOwner.save();

    return toy;
}

export const deleteToy = async(args)=> {
    const id = args.id;
    const toy = await Toy.findByIdAndRemove(id).populate("owner");
    await toy.owner.toys.pull(toy);
    await toy.owner.save();
    return toy;
}
