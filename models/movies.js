//Mouhamed Abdallah SAKHO

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            id: Number,
            title: String,
            release: Number,
            synopsis: String
        }
    );
  
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Movie = mongoose.model("movie", schema);
    return Movie;
};

  
