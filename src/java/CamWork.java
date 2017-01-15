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

        // get default webcam and open it
        setResolution();
        Webcam webcam = Webcam.getDefault();
        webcam.open();

        // get image

        BufferedImage image = webcam.getImage();

        // save image to PNG file
        String fileName = "../../public/" + System.getTimeMillis() + ".jpg";
        ImageIO.write(image, "JPG", fileName));
        System.out.println(fileName);
    }

    public static void setResolution() throws IOException {
        Webcam webcam = Webcam.getDefault();
        webcam.setViewSize(new Dimension(640, 480));
        webcam.open();
        ImageIO.write(webcam.getImage(), "JPG", new File("test.JPG"));
        webcam.close();
    }
}
