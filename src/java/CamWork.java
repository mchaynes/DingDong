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
        String fileName = System.currentTimeMillis() + ".jpg";
        System.out.println(fileName);
        ImageIO.write(webcam.getImage(), "JPG", new File("public/" + fileName));
        webcam.close();
    }
}
