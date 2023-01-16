const shuffled = (list) => {
	return list.sort(() => Math.random() - 0.5);
};

export default shuffled;
