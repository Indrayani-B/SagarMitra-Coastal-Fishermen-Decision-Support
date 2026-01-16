import tensorflow as tf

model = tf.keras.models.load_model(
    "models/fish_model/fish_classifier_best_FT(18-12-25).keras"
)
print(model.summary())
