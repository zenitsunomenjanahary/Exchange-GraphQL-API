import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Toy from "../models/Toy.js";
import Exchange from "../models/Exchange.js";

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

export const toys = ()=> Toy.find().populate("owner");

export const toy = (args)=> Toy.findById(args.id).populate("owner");

export const createToy = async(args)=> {
    const { name, photo, owner } = args.toyInput;

    const toy = new Toy({ name, photo, owner });

    // update user toys
    const user = await User.findById(owner);
    user.toys.push(toy);
    await user.save();

    return toy.save();
}

export const updateToy = async(args)=> {
    const { id, name, photo } = args;
    return Toy.findByIdAndUpdate(id,{ name, photo },{ new: true });
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

export const exchange = (args) => {
    const id = args.id;
    return Exchange.findById(id);
}

export const exchanges = async(args)=> {
    const page = args.page -1 || 0;
    const limit = args.limit || 2;
    const status = args.status || "activate";

    const exchanges = await Exchange.find()
                                    .where({status})
                                    .skip(page * limit)
                                    .limit(limit);

    const totalCount = await Exchange.countDocuments({status});

    return {
        totalCount,
        exchanges,
        pageInformation: { page: page + 1, limit, status}
    }
}

export const createExchange = async(args)=> {
    const { name, contact, toyToExchange, exchangeTo,photo } = args.exchangeInput;
    const user = await User.findOne({ name: name}).populate("toys");
    
    // check if toy to exchange really exist in user's toy
    const foundToyInUser = user.toys.some(el => el.name === toyToExchange);

    if(foundToyInUser){
        const exchange = new Exchange({
            name, contact, toyToExchange, exchangeTo, photo
        });
        return exchange.save();
    }
    return;
}

export const desactivateExchange = async(args)=>{
    const id = args.id;
    const exchange = await Exchange.findByIdAndUpdate(id,{
        status: "desactivate"
    },{ new: true });
    return exchange.save();
}