import java.awt.Dimension;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import com.github.sarxos.webcam.Webcam;

/**
 * Takes single picture
 */
public class CamWork {

    public static void main(String[] args) throws IOException {
        savePicture();
    }

    public static void savePicture() throws IOException {
        Webcam webcam = Webcam.getDefault();
        webcam.setViewSize(new Dimension(640, 480));
        webcam.open();
        ImageIO.write(webcam.getImage(), "JPG", new File("public/" + System.currentTimeMillis() + ".jpg"));
        webcam.close();
    }
}
